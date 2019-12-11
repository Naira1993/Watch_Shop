
declare var M



export class MaterialService {

  static toast(message: string) {
    M.toast({ html: message })
  }

  static init(ref: any) {
    M.Tabs.init(ref)
  }
}
