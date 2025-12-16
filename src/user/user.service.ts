import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { users } from 'src/database/model';
import { paginate, PaginatedResult } from 'src/helper/Pagination/paginate';

@Injectable()
export class UserService {
  constructor(@Inject('DB') private db: any) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const result = await this.db.insert(users).values(dto);
    const id = result.insertId;
    const [user] = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users)
      .where(eq(users.id, id));

    return user;
  }


  async findAll(page:number, limit:number): Promise<PaginatedResult<UserResponseDto>> {
    const query =  this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users);
    return  paginate<UserResponseDto>(this.db,query,users, page, limit);
  }


  async findOne(id: number): Promise<UserResponseDto | null> {
    const [user] = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users)
      .where(eq(users.id, id));

    return user ?? null;
  }


  async update(dto: UpdateUserDto): Promise<UserResponseDto | null> {
    await this.db.update(users).set(dto).where(eq(users.id, dto?.id));

    const [updatedUser] = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users)
      .where(eq(users.id, dto?.id));

    return updatedUser ?? null;
  }


  async remove(id: number): Promise<UserResponseDto | null> {
    const [userToDelete] = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users)
      .where(eq(users.id, id));
    if (!userToDelete) return null;
    await this.db.delete(users).where(eq(users.id, id));

    return userToDelete;
  }
}
