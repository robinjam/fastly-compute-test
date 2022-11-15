import { baseUrl, lastBackendRequest, startBackend, startFastly, stopBackend, stopFastly } from "./support/integrationSpecHelpers.js"

describe("integration specs", () => {
  beforeAll(async () => {
    await startBackend()
    await startFastly()
  }, 10000)

  afterAll(async () => {
    await stopFastly()
    await stopBackend()
  })

  it("strips UTM search params", async () => {
    const response = await fetch(`${baseUrl}/?utm_medium=social&foo=bar`)
    expect(response.status).toBe(200)
    expect(lastBackendRequest.url).toEqual("/?foo=bar")
  })

  it("sorts URL search params", async () => {
    const response = await fetch(`${baseUrl}/?c=d&a=b`)
    expect(response.status).toBe(200)
    expect(lastBackendRequest.url).toEqual("/?a=b&c=d")
  })
})
