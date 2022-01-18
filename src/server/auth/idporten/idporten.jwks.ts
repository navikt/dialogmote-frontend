import { getIssuer } from "./idporten.issuer"

let _jwks: { keys: { kid: string }[] }

export const getJWKS = async () => {
    if (_jwks) return _jwks
    const issuer = await getIssuer()
    const jwksResponse = await fetch(issuer.metadata.jwks_uri as string, { method: "GET" })
    _jwks = await jwksResponse.json()
    return _jwks
}
