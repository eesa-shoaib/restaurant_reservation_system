import { Module } from "@nestjs/common";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";
import { CancelReservationActionService } from "./actions/cancel-reservation-action.service";
import { CompleteReservationActionService } from "./actions/complete-reservation-action.service";
import { CreateReservationActionService } from "./actions/create-reservation-action.service";
import { RescheduleReservationActionService } from "./actions/reschedule-reservation-action.service";

@Module({
  controllers: [ReservationController],

  providers: [
    ReservationService,
    CreateReservationActionService,
    CancelReservationActionService,
    CompleteReservationActionService,
    RescheduleReservationActionService,
  ],
})
export class ReservationsModule {}
