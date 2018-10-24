export declare interface PayloadCreation {
  restURL: string
  burnBCH(): Promise<string>
  changeIssuer(propertyId: number): Promise<string>
  closeCrowdSale(propertyId: number): Promise<string>
  grant(propertyId: number, amount: string, memo?: string): Promise<string>
  crowdsale(ecosystem: string,
            propertyPrecision: number,
            previousId: number,
            category:string,
            subcategory: string,
            name: string,
            url: string,
            data: string,
            propertyIdDesired: number,
            tokensPerUnit: string,
            deadline: number,
            earlyBonus: number,
            undefine: number,
            totalNumber: string): Promise<string>
  fixed(ecosystem: string,
        propertyPrecision: number,
        previousId: number,
        category: string,
        subcategory: string,
        name: string,
        url: string,
        data: string,
        amount: string): Promise<string>
  managed(ecosystem: string,
        propertyPrecision: number,
        previousId: number,
        category: string,
        subcategory: string,
        name: string,
        url: string,
        data: string): string
  participateCrowdSale(amount: string): Promise<string>
  revoke(propertyId: number, amount: string): Promise<string>
  simpleSend(propertyId: number, amount: string): Promise<string>
  STO(propertyId: number, amount: string, distributionProperty?: number): Promise<string>
}