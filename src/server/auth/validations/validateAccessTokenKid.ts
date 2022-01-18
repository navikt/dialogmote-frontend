import jwt_decode from "jwt-decode"
import {
    IValidationResult,
    SuccessfullValidationResult,
    ValidationResult,
} from "./ValidationResult"

export const validateAccessTokenKid = (bearerToken: string): IValidationResult<string> => {
    try {
        const jwtHeader = jwt_decode<{ kid: string }>(bearerToken, { header: true })
        return new SuccessfullValidationResult<string>(jwtHeader.kid)
    } catch (e) {
        return new ValidationResult<string>("", ["failed to decode access token header"])
    }
}
