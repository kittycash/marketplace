
export class Paging {

  constructor() { }

  format(page: number, per_page: number, count: number) {

    return {start_index: (page - 1) * per_page, page_size: per_page};
  }

}
