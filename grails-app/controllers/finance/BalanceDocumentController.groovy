package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class BalanceDocumentController {

    def balanceDocumentService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond BalanceDocument.list(params), model:[balanceDocumentCount: BalanceDocument.count()]
    }

    def show(BalanceDocument balanceDocument) {
        respond balanceDocument
    }

    @Transactional
    def save(BalanceDocument balanceDocument) {
        if (balanceDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        balanceDocumentService.save balanceDocument

        if (balanceDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balanceDocument.errors, view:'create', status: UNPROCESSABLE_ENTITY
            return
        }

//        balanceDocument.save flush:true

        respond balanceDocument, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(BalanceDocument balanceDocument) {
        if (balanceDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (balanceDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balanceDocument.errors, view:'edit', status: UNPROCESSABLE_ENTITY
            return
        }

        balanceDocument.save flush:true

        respond balanceDocument, [status: OK, view:"show"]
    }

    @Transactional
    def delete(BalanceDocument balanceDocument) {

        if (balanceDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        balanceDocumentService.delete balanceDocument
//        balanceDocument.delete flush:true

        if (balanceDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balanceDocument.errors, status: FAILED_DEPENDENCY
            return
        }

        render status: NO_CONTENT
    }

    @Transactional
    def process(BalanceDocument balanceDocument) {

        if (balanceDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        balanceDocumentService.process(balanceDocument)

        if (balanceDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balanceDocument.errors, view:'edit', status: METHOD_NOT_ALLOWED
            return
        }

        respond balanceDocument, [status: OK, view:"show"]
    }

    @Transactional
    def revoke(BalanceDocument balanceDocument) {

        if (balanceDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        balanceDocumentService.revoke balanceDocument

        if (balanceDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balanceDocument.errors, status: FAILED_DEPENDENCY
            return
        }

        respond balanceDocument, [status: OK, view:"show"]
    }
}
