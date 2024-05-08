import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length, IsString, IsInt, Min } from "class-validator";

export class BookDto {


  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;

  @ApiProperty({ description: "Book ID." })
  id: number;
  @ApiProperty({
    example: "The Great Gatsby",
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 200)
  @IsString()
  title: string;

  @ApiProperty({
    example: "F. Scott Fitzgerald",
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 100)
  @IsString()
  author: string;
}
