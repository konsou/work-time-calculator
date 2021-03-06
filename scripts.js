class TimeValue {
    hours
    minutes
    lastModifiedTimestamp
    constructor(hours, minutes){
        this.hours = hours + (parseInt(minutes / 60))
        this.minutes = minutes % 60
        this.lastModifiedTimestamp = Date.now()
    }

    asHours(){
        return this.hours + (this.minutes / 60)
    }

    asMinutes(){
        return (this.hours * 60) + this.minutes
    }

    add(otherTimeValue){
        const totalMinutes = this.asMinutes() + otherTimeValue.asMinutes()
        const newHours = parseInt(totalMinutes / 60)
        const newMinutes = totalMinutes % 60
        return new TimeValue(newHours, newMinutes)        
    }

    subtract(otherTimeValue){
        const totalMinutes = this.asMinutes() - otherTimeValue.asMinutes()
        const newHours = parseInt(totalMinutes / 60)
        const newMinutes = totalMinutes % 60
        return new TimeValue(newHours, newMinutes)
    }

    set(hours, minutes){
        if (this.hours != hours || this.minutes != minutes){
            this.hours = (hours == null)
                ? null
                : hours + (parseInt(minutes / 60))
            this.minutes = (minutes == null)
                ? null 
                : minutes % 60
            this.lastModifiedTimestamp = Date.now()    
        }
    }

    setFromTimeValue(otherTimeValue){
        this.set(otherTimeValue.hours, otherTimeValue.minutes)
    }

    setFromString(string){
        if (string.length === 0){
            this.set(null, null)
            return
        }
        const timeSplit = string.split(".")
        const hours = parseInt(timeSplit[0])
        const minutes = parseInt(timeSplit[1])
        this.set(hours ? hours : 0, minutes ? minutes : 0)
    }

    isValid(){
        return (this.hours !== null && this.minutes !== null)
    }

    asString(){
        return this.hours + "." + this.minutes
    }
}

const decideWhichFieldToCalculate = (startTime, breakDuration, endTime, workHours) => {
    // TODO: implement
}

const startTime = new TimeValue(null, null)
const breakDuration = new TimeValue(null, null)
const endTime = new TimeValue(null, null)
const workHours = new TimeValue(null, null)

const calculateMissingTime = () => {
    console.log("calculateMissingTime triggered")
    startTime.setFromString(document.getElementById("start-time").value)
    breakDuration.setFromString("0." + document.getElementById("break-duration").value)
    endTime.setFromString(document.getElementById("end-time").value)
    workHours.setFromString(document.getElementById("work-hours").value)

    console.log("Start time:", startTime, startTime?.asHours(), startTime?.asMinutes())
    console.log("Break:", breakDuration)
    console.log("End time:", endTime)
    console.log("Work hours", workHours)
    
    console.log("Start + break:", startTime.add(breakDuration))

    const allHaveValues = [startTime, breakDuration, endTime, workHours].every(val => val.isValid())
    console.log("allHaveValues:", allHaveValues)

    // TODO: If any other field is empty calculate that
    if (!workHours.isValid() || allHaveValues){
        workHours.setFromTimeValue(endTime.subtract(startTime).subtract(breakDuration))
        console.log(workHours)
        document.getElementById("work-hours").value = workHours.asString()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")

    document.getElementById("calculate-time-button").addEventListener("click", (event) => {
        event.preventDefault()
        calculateMissingTime()
    })

    Array.from(document.getElementsByClassName("watch-change")).forEach(item => {
        item.addEventListener("keyup", () => calculateMissingTime())
        item.addEventListener("change", () => calculateMissingTime())
    })
    

})