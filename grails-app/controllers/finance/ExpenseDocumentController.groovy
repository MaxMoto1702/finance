package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ExpenseDocumentController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def expenseDocumentService

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ExpenseDocument.list(params), model:[expenseDocumentCount: ExpenseDocument.count()]
    }

    def show(ExpenseDocument expenseDocument) {
        respond expenseDocument
    }

    @Transactional
    def save(ExpenseDocument expenseDocument) {
        if (expenseDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        expenseDocumentService.save(expenseDocument)

        if (expenseDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expenseDocument.errors, view:'create', status: UNPROCESSABLE_ENTITY
            return
        }

        expenseDocument.save flush:true

        respond expenseDocument, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ExpenseDocument expenseDocument) {
        if (expenseDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (expenseDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expenseDocument.errors, view:'edit', status: UNPROCESSABLE_ENTITY
            return
        }

        expenseDocument.save flush:true

        respond expenseDocument, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ExpenseDocument expenseDocument) {

        if (expenseDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

//        expenseDocument.delete flush:true
        expenseDocumentService.delete(expenseDocument)

        if (expenseDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expenseDocument.errors, view:'edit', status: METHOD_NOT_ALLOWED
            return
        }

        respond expenseDocument, [status: OK, view:"show"]
    }

    @Transactional
    def process(ExpenseDocument expenseDocument) {
        if (expenseDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        expenseDocumentService.process(expenseDocument)

        if (expenseDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expenseDocument.errors, view:'edit', status: METHOD_NOT_ALLOWED
            return
        }

        respond expenseDocument, [status: OK, view:"show"]
    }

    @Transactional
    def revoke(ExpenseDocument expenseDocument) {
        if (expenseDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        expenseDocumentService.revoke(expenseDocument)

        if (expenseDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expenseDocument.errors, view:'edit', status: METHOD_NOT_ALLOWED
            return
        }

        respond expenseDocument, [status: OK, view:"show"]
    }
}
