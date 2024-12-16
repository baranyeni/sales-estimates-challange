import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  connect() {
    new DateRangePicker(this.element, {
      startDate: "01/01/2014", endDate: "23/12/2019",
      locale: { format: "DD/MM/YYYY" }
    });
  }
}
