import { Room } from "./room";

export class Reservation {
    id: number;
    idRoom: number;
    customerName: string;
    checkInDate: string;
    checkOutDate: string;
    room: Room;
}

