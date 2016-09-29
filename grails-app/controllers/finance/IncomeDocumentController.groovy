package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class IncomeDocumentController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond IncomeDocument.list(params), model:[incomeDocumentCount: IncomeDocument.count()]
    }

    def show(IncomeDocument incomeDocument) {
        respond incomeDocument
    }

    @Transactional
    def save(IncomeDocument incomeDocument) {
        if (incomeDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (incomeDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond incomeDocument.errors, view:'create', status: UNPROCESSABLE_ENTITY
            return
        }

        incomeDocument.save flush:true

        respond incomeDocument, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(IncomeDocument incomeDocument) {
        if (incomeDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (incomeDocument.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond incomeDocument.errors, view:'edit', status: UNPROCESSABLE_ENTITY
            return
        }

        incomeDocument.save flush:true

        respond incomeDocument, [status: OK, view:"show"]
    }

    @Transactional
    def delete(IncomeDocument incomeDocument) {

        if (incomeDocument == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        incomeDocument.delete flush:true

        render status: NO_CONTENT
    }

    @Transactional
    def process(BalanceDocument balanceDocument) {
        throw new RuntimeException("Process document not implemented")
//        respond balanceDocument, [status: OK, view:"show"]
    }

    @Transactional
    def rollback(BalanceDocument balanceDocument) {
        throw new RuntimeException("Rollback document not implemented")
    }
}
