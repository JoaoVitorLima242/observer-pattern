import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import PaymentSubject from '../src/subjects/payment'
import PaymentEvent from '../src/events/payment'
import Shipment from '../src/observers/shipment'
import Marketing from '../src/observers/marketing'


describe('Test Suite for Observer Pattern', () => {
  beforeAll(() => {
  })

  test('#PaymentSubject notify observer', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)


    expect(observer.update).toBeCalledWith(expected)
  })
  test('#PaymentSubject should not notify unsubscribed observered', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)


    expect(observer.update).not.toBeCalled()
  })
  test('#PaymentSubject should  notify subscribed after a credut card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new PaymentEvent(subject)
    const paymentSubjectNotifySpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name)
    const data = { userName: "joaovitor", id: Date.now() }

    payment.creditCard(data)

    expect(paymentSubjectNotifySpy).toBeCalledWith(data)
  })
  test('#All should  notify subscribed after a credut card transaction', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new PaymentEvent(subject)
    const data = { userName: "joaovitor", id: Date.now() }

    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  })
})
