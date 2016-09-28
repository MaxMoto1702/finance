package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ExchangeDocumentController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ExchangeDocument.list(params), model:[exchangeDocumentCount: ExchangeDocument.count()]
    }

    def show(ExchangeDocument exchangeDocument) {
        respond exchangeDocument
    }

    @Transactional
    def save(ExchangeDocument exchangeDocument) {
        if (exchangeDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (exchangeDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond exchangeDocument.errors, view:'create', status: UNPROCESSABLE_ENTITY
            return
        }

        exchangeDocument.save flush:true

        respond exchangeDocument, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ExchangeDocument exchangeDocument) {
        if (exchangeDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (exchangeDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond exchangeDocument.errors, view:'edit', status: UNPROCESSABLE_ENTITY
            return
        }

        exchangeDocument.save flush:true

        respond exchangeDocument, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ExchangeDocument exchangeDocument) {

        if (exchangeDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        exchangeDocument.delete flush:true

        render status: NO_CONTENT
    }
}
