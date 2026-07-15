import { Module } from "@nestjs/common";
import { TableController } from "./table.controller";
import { TableService } from "./table.service";
import { CreateTableActionService } from "./actions/create-table-action.service";
import { UpdateTableActionService } from "./actions/update-table-action.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantTables } from "./entities/table.entity";
import { RestaurantsModule } from "../restaurants/restaurants.module";

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantTables]), RestaurantsModule],
  controllers: [TableController],
  providers: [TableService, UpdateTableActionService, CreateTableActionService],
})
export class TablesModule { }
