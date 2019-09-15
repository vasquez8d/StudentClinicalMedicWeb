import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class GlobalHelper {
    getDate() {
        const date = new Date(),
            year = date.getFullYear(),
            month = (date.getMonth() + 1).toString(),
            formatedMonth = (month.length === 1) ? ('0' + month) : month,
            day = date.getDate().toString(),
            formatedDay = (day.length === 1) ? ('0' + day) : day,
            hour = date.getHours().toString(),
            formatedHour = (hour.length === 1) ? ('0' + hour) : hour,
            minute = date.getMinutes().toString(),
            formatedMinute = (minute.length === 1) ? ('0' + minute) : minute,
            second = date.getSeconds().toString(),
            formatedSecond = (second.length === 1) ? ('0' + second) : second;
        return formatedDay + '/' + formatedMonth + '/' + year + ' ' + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
    }

    getDateFileName() {
        const date = new Date(),
            year = date.getFullYear(),
            month = (date.getMonth() + 1).toString(),
            formatedMonth = (month.length === 1) ? ('0' + month) : month,
            day = date.getDate().toString(),
            formatedDay = (day.length === 1) ? ('0' + day) : day,
            hour = date.getHours().toString(),
            formatedHour = (hour.length === 1) ? ('0' + hour) : hour,
            minute = date.getMinutes().toString(),
            formatedMinute = (minute.length === 1) ? ('0' + minute) : minute,
            second = date.getSeconds().toString(),
            formatedSecond = (second.length === 1) ? ('0' + second) : second;
        return formatedDay + '-' + formatedMonth + '-' + year + '-' + formatedHour + '-' + formatedMinute + '-' + formatedSecond;
    }

    getFileNameFormat(fileName){
        let finalName = fileName.toLowerCase();
        finalName = finalName.replace(/\s+/g, '-');
        finalName = finalName.replace(/['á']/g, 'a');
        finalName = finalName.replace(/['é']/g, 'e');
        finalName = finalName.replace(/['í']/g, 'i');
        finalName = finalName.replace(/['ó']/g, 'o');
        finalName = finalName.replace(/['ú']/g, 'u');
        finalName = finalName.replace(/['ñ']/g, 'n');
        return finalName;
    }
}
