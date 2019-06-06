<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView>
            <StackLayout class="home-panel">
                <ListView class="list-group" for="appointment in appointments"
                    @itemTap="onItemTap" style="height:1800px">
                    <v-template>
                        <GridLayout class="list-group-item" rows="auto,auto,auto,*"
                            columns="auto,auto, *">
                            <Image rowSpan="3" col="0" src="~/components/beard.png"
                                class="thumb img-circle" />
                            <Label row="0" col="1" :text="appointment.AppointmentId" />
                            <Label row="1" col="1" :text="appointment.name" />
                            <Label row="2" col="1" text="Next" v-if="appointment.status === 0" />
                            <Label row="2" col="1" text="Current" v-if="appointment.status === 1" />
                            <Label row="2" col="1" text="Completed" v-if="appointment.status === 3" />
                            <Label rowSpan="3" col="2" :text="appointment.timeInterval"
                                class="text-right" />
                        </GridLayout>
                    </v-template>
                </ListView>
                <Button text="Make Appointment" @tap="addNewAppointment"
                    class="default-barber-btn" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import NewAppointment from "./NewAppointment";
    export default {
        methods: {
            addNewAppointment() {
                console.log("fsdfs");
                this.$navigateTo(NewAppointment);
            },

            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
            }
        },

        mounted() {
            const httpModule = require("http");
            httpModule
                .request({
                    url: "https://eveningbrew.herokuapp.com/api/appointments",
                    method: "GET"
                })
                .then(
                    response => {
                        console.log("Appointments data retrieved");
                        console.log(response.content.toString());
                        this.appointments = response.content.toJSON();
                    },
                    e => {}
                );
        },

        data() {
            return {
                appointments: []
            };
        }
    };
</script>

<style>
    .default-barber-btn {
        color: white;
        background-color: black;
        margin-top: 20;
        height: 70;
    }

    .gray-background {
        background-color: #D0D0D0;
    }

    .green-background {
        background-color: #8FCDC3
    }
</style>