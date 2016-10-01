package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class OperationController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Operation.list(params), model:[operationCount: Operation.count()]
    }

    def show(Operation operation) {
        respond operation
    }

    @Transactional
    def save(Operation operation) {
        if (operation == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (operation.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond operation.errors, view:'create'
            return
        }

        operation.save flush:true

        respond operation, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Operation operation) {
        if (operation == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (operation.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond operation.errors, view:'edit'
            return
        }

        operation.save flush:true

        respond operation, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Operation operation) {

        if (operation == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        operation.delete flush:true

        render status: NO_CONTENT
    }
}
