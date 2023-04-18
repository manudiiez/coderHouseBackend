// import { TaskStatus } from '../tasks.entity'
// import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

// export class createTaskDto {
//     @IsString()
//     @IsNotEmpty()
//     @MinLength(3)
//     title: string
//     @IsString()
//     @IsNotEmpty()
//     description: string
// }

// // @? para que typescript sepa que algunas veces los datos van a aser indefinidos
// export class updateTaskDto {
//     @IsString()
//     @IsOptional()
//     title?: string
//     @IsString()
//     @IsOptional()
//     description?: string
//     @IsString()
//     @IsOptional()
//     @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
//     status?: TaskStatus
// }