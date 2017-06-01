export class History {

	constructor(
		public category: string,
		public total: number,
		public ok: number,
		public nok: number,
		public retry:number,
        public application?:string,
	){}
}
