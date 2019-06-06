<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView>
            <StackLayout class="home-panel">
                <Label text="Add New Appointment" class="h2 font-weight-bold"
                    backgroundColor="black" color="white" height="70"
                    textAlignment="center" style="padding-top: 15;" />
                <Label text="Name" style="padding-top: 0; margin-left: 20; margin-right: 20;"/>
                <TextField v-model="textFieldValue" hint="Name"  margin="20" />
                <StackLayout orientation="horizontal" height="70" style="margin-left: 20; margin-right: 20;">
                    <Label text="Appointment is for me" style="padding-top: 25;" />
                    <Switch checked="true" />
                </StackLayout>
                <Label text="Appointment Date" style="padding-top: 0; margin-left: 20; margin-right: 20;"/>
                <DatePicker :year="currentYear" :month="currentMonth" :day="currentDay"
                    minDate="1970-01-01" maxDate="2100-12-31" />
                    <Label text="Appointment Time" style="padding-top: 0; margin-left: 20; margin-right: 20;"/>
                <TimePicker :hour="currentHour" :minute="currentMinute" />
                <Button text="Done" @tap="addNewAppointment"
				                    class="default-barber-btn" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script> 
import Home from "./Home";

    export default { 
        methods: { 
            addNewAppointment() {  
            const httpModule = require("http");
			 httpModule.request(
                 {
                     url: "https://eveningbrew.herokuapp.com/api/appointments", 
                     method: "POST",
					 headers: { "Content-Type": "application/json" }, 
                     content: JSON.stringify({name:this.textFieldValue,timeInterval:"15:00-15.30",startTime:"15:00",status:1})
                     })
                     .then( response => { 
                         console.log('Login success ');
			                this.$navigateTo(Home); 
                            }, e => {} );
             },
              },
        data() {
            return {
                currentDay: new Date().getUTCDate(),
                currentMonth: new Date().getUTCMonth() + 1,
                currentYear: new Date().getUTCFullYear(),

                textFieldValue: "",

                name: "",
                forMe: true
            };
        }
    };
</script>

<style> 
.default-barber-btn 
{ 
    color: white; background-color: black; margin-top: 20; height: 70; 
}
</style>