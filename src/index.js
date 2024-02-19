import Marketing from "./observers/marketing.js";
import PaymentEvent from "./events/payment.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/payment.js";

const subject = new PaymentSubject()
const marketing = new Marketing()

subject.subscribe(marketing)

const shipment = new Shipment()

subject.subscribe(shipment)

const payment = new PaymentEvent(subject)
payment.creditCard({ userName: "joaozin", id: '1' })

subject.unsubscribe(marketing)

payment.creditCard({ userName: "joaozin", id: '1' })

