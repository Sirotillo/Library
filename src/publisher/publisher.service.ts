import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePublisherDto } from "./dto/create-publisher.dto";
import { UpdatePublisherDto } from "./dto/update-publisher.dto";
import { Publisher } from "./entities/publisher.entity";

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepo: Repository<Publisher>
  ) {}

  async create(createPublisherDto: CreatePublisherDto) {
    const newPublisher = this.publisherRepo.create(createPublisherDto);
    await this.publisherRepo.save(newPublisher);
    return newPublisher;
  }

  async findAll() {
    return await this.publisherRepo.find();
  }

  async findOne(id: number) {
    const publisher = await this.publisherRepo.findOneBy({ id });
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    const publisher = await this.publisherRepo.preload({
      id,
      ...updatePublisherDto,
    });

    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }

    return await this.publisherRepo.save(publisher);
  }

  async remove(id: number) {
    const result = await this.publisherRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return { message: `Publisher with ID ${id} successfully deleted` };
  }
}
