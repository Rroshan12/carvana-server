import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedResult } from 'src/helper/Pagination/paginate';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  // Get all users
  @Get()
  async findAll(@Query('page') page:number, @Query('limit') limit:number):  Promise<PaginatedResult<UserResponseDto>> {
    return await this.userService.findAll(page, limit);
  }

  // Get a single user by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.userService.findOne(+id);
  }

  // Update a user
  @Patch(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    return await this.userService.update(updateUserDto);
  }

  // Delete a user
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.userService.remove(+id);
  }
}
