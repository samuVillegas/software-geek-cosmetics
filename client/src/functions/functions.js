module.exports = {
    generatorDate: ()=>{
        var d = new Date();
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = d.getFullYear();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        var hours = d.getHours() - 5
        var minutes = d.getMinutes();
        
        if(hours<0) hours = 24+hours;
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        return year + "/" + month + "/" + day+ " "+ hours + ":" + minutes;
    }
    
}