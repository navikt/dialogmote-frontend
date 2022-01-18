import jwktopem from "jwk-to-pem"
import jwt from "jsonwebtoken"
import {
    FailedValidationResult,
    IValidationResult,
    SuccessfullValidationResult,
} from "./ValidationResult"
import { getIssuer, getJWKS } from "../idporten"
import { validateAccessTokenKid } from "./validateAccessTokenKid"

export const validateAccessToken = async (accessToken: string): Promise<IValidationResult<null>> => {
    const accessTokenKidValidation = validateAccessTokenKid(accessToken)
    if (!accessTokenKidValidation.success) {
        return new FailedValidationResult(accessTokenKidValidation.error)
    }

    const accessTokenKid = accessTokenKidValidation.value

    let jwks
    try {
        jwks = await getJWKS()
    } catch (e) {
        return new FailedValidationResult("failed to retrieve jwk from idporten issuer")
    }

    const jwk = jwks.keys.find(({ kid }) => kid == accessTokenKid)
    if (!jwk) {
        return new FailedValidationResult(
            `failed to find jwk with kid ${accessTokenKid} in list of ${jwks.keys?.length} keys`
        )
    }

    let publicKey
    try {
        // @ts-ignore
        publicKey = jwktopem(jwk)
    } catch (e) {
        return new FailedValidationResult("failed to parse public key from jwk")
    }

    try {
        const issuer = await getIssuer()
        jwt.verify(accessToken, publicKey, { issuer: issuer.metadata.issuer })
    } catch (e) {
        return new FailedValidationResult("failed to verify access token")
    }

    return new SuccessfullValidationResult<null>(null)
}
