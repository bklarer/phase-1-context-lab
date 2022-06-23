/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = function (dateStamp) {
    //can use destructuring const[date, hour] = timeIn.split(" ")
    const date = dateStamp.split(" ")[0]
    const hour = dateStamp.split(" ")[1]


    const timeInLog = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    
    this.timeInEvents.push(timeInLog) //brings external context in

    return this
}

const createTimeOutEvent = function (dateStamp) {
    //can use destructuring const[date, hour] = timeIn.split(" ")
    const date = dateStamp.split(" ")[0]
    const hour = dateStamp.split(" ")[1]


    const timeOutLog = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    
    this.timeOutEvents.push(timeOutLog) //brings external context in

    return this
}

function hoursWorkedOnDate (date) { 
    const inPunches = this.timeInEvents.find(inPunch => inPunch.date === date)
    const outPunches = this.timeOutEvents.find(outPunch => outPunch.date === date)

    return(outPunches.hour - inPunches.hour) / 100
}

function wagesEarnedOnDate (date) { //need to reference the date of the record and pull hours and wage and multiply
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}






const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (records, firstName) {
    return records.find(record =>record.firstName === firstName)
}

function calculatePayroll (recordsArr) { //reference all values of all dates worked by each employee, put in array, and sum the total wages
    return recordsArr.reduce((total, record) => {
        return total + allWagesFor.call(record)
    }, 0)
}