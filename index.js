// Your code here


function createEmployeeRecord(info) {
const [firstName, familyName, title, payPerHour] = info;
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
};

function createEmployeeRecords(empRecords) {
    return empRecords.map(emp => createEmployeeRecord(emp));
};

function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
  
    employeeRecord.timeInEvents.push({
         type: "TimeIn",
         hour: parseInt(hour, 10),
         date,
     })
     return employeeRecord
  };
  
  
function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
};

function  hoursWorkedOnDate(employeeRecord, date){
    let inEvent =  employeeRecord.timeInEvents.find(
        d =>  d.date === date)
    let outEvent =  employeeRecord.timeOutEvents.find(
        d =>  d.date === date)
    return (outEvent.hour - inEvent.hour)/100
};

function wagesEarnedOnDate(employeeRecord, date) {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
};

function allWagesFor(employeeRecord){
    const allWages = employeeRecord.timeInEvents.map((day) => {return wagesEarnedOnDate(employeeRecord, day.date)})
    return allWages.reduce((a, b) => a + b, 0)
};

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find((record) => record.firstName === firstName)
};

function calculatePayroll(employeeRecords){
    const allPay = (employeeRecords.map((e) => {return allWagesFor(e)}))
    return allPay.reduce((a, b) => a + b, 0)
};
