import { Module } from '@nestjs/common';
import { ReservationController } from './reservations/reservation.controller';
import { ReservationService } from './reservations/reservation.service';
import { CreateReservationActionService } from './reservations/actions/create-reservation-action.service';
import { ConfirmReservationActionService } from './reservations/actions/confirm-reservation-action.service';
import { CancelReservationActionService } from './reservations/actions/cancel-reservation-action.service';
import { CompleteReservationActionService } from './reservations/actions/complete-reservation-action.service';
import { RescheduleReservationActionService } from './reservations/actions/reschedule-reservation-action.service';
import { RestaurantController } from './restaurants/restaurant.controller';
import { RestaurantService } from './restaurants/restaurant.service';
import { CreateRestaurantActionService } from './restaurants/actions/create-restaurant-action.service';
import { UpdateRestaurantActionService } from './restaurants/actions/update-restaurant-action.service';
import { UpdateOperatingHoursActionService } from './restaurants/actions/update-operating-hours-action.service';
import { TableController } from './tables/table.controller';
import { TableService } from './tables/table.service';
import { CreateTableActionService } from './tables/actions/create-table-action.service';
import { UpdateTableActionService } from './tables/actions/update-table-action.service';

@Module({
  controllers: [ReservationController, RestaurantController, TableController],
  providers: [ReservationService, CreateReservationActionService, ConfirmReservationActionService, CancelReservationActionService, CompleteReservationActionService, RescheduleReservationActionService, RestaurantService, CreateRestaurantActionService, UpdateRestaurantActionService, UpdateOperatingHoursActionService, TableService, CreateTableActionService, UpdateTableActionService]
})
export class RestaurantBookingModule {}
