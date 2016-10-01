import finance.Account
import finance.Company
import grails.util.Environment

class BootStrap {

    def init = { servletContext ->
        if (Environment.current == Environment.DEVELOPMENT) {
            def account = new Account(name: 'For development')
            if (account.validate())
                account.save(flush: true)
            else
                log.error("Can not save account for development")
            def company = new Company(name: 'For development')
            if (company.validate())
                company.save(flush: true)
            else
                log.error("Can not save company for development")
        }
    }
    def destroy = {
    }
}
