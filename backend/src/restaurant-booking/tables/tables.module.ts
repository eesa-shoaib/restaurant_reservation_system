import { Module } from "@nestjs/common";
import { TableController } from "./table.controller";
import { TableService } from "./table.service";
import { CreateTableActionService } from "./actions/create-table-action.service";
import { UpdateTableActionService } from "./actions/update-table-action.service";

@Module({
  controllers: [TableController],
  providers: [TableService, UpdateTableActionService, CreateTableActionService],
})
export class TablesModule {}
