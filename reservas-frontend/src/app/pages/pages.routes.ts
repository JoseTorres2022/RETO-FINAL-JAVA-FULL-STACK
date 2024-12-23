import { Routes } from "@angular/router";
import { RoomComponent } from "./room/room.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { RoomDialogComponent } from "./room/room-dialog/room-dialog.component";

export const pagesRoutes: Routes = [
    { path: 'room', component: RoomComponent, children: [
        // { path: 'new', component: RoomDialogComponent},
        // { path: 'edit/:id', component: PatientEditComponent}
    ]},    
    { path: 'reservation', component: ReservationComponent},
]