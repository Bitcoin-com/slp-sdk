const BITBOXSocket = require("bitbox-sdk").Socket
import { SLPSocketConfig } from "./interfaces/SLPInterfaces"

export class Socket extends BITBOXSocket {
  socket: any
  slpsocketURL: string
  constructor(config: SLPSocketConfig = {}) {
    super(config)
    if (config.slpsocketURL) {
      this.slpsocketURL = config.slpsocketURL
    } else {
      this.slpsocketURL = "https://slpsocket.bchdata.cash"
    }
  }

  public listen(query: string, cb: Function): void {
    if (query === "blocks" || query === "transactions") {
      super.listen(query, cb)
    } else {
      let EventSource = require("eventsource")
      let b64 = Buffer.from(JSON.stringify(query)).toString("base64")
      this.socket = new EventSource(`${this.slpsocketURL}/s/${b64}`)
      this.socket.onmessage = (msg: any) => {
        cb(msg.data)
      }
    }
  }
}
