package com.backend_spring.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class LocalDateTimeModel {

    private int year;
    private int month;
    private int day;
    private int minute;
    private int second;
    private int hour;


    public LocalDateTimeModel() {
        LocalDateTime localDateTime = LocalDateTime.now();
        this.year = localDateTime.getYear();
        this.month = localDateTime.getMonth().getValue();
        this.day = localDateTime.getDayOfMonth();
        this.minute = localDateTime.getMinute();
        this.second = localDateTime.getSecond();
        this.hour = localDateTime.getHour();
    }

}
