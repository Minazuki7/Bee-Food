import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";
import { Model } from "mongoose";
import { CompaniesService } from "./companies.service";
import { Company, CompanyDocument } from "@fd-wereact/schemas";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedCompanies extends PaginatedList(Company) {}

@Resolver(() => Company)
export class CompaniesResolver extends CrudResolver(
  Company,
  PaginatedCompanies
) {
  constructor(
    private readonly companiesService: CompaniesService,
    @InjectModel(Company.name)
    companyModel: Model<CompanyDocument>
  ) {
    super(companyModel);
  }

  @Mutation(() => Company)
  createCompany(
    @Args("createCompanyInput") createCompanyInput: CreateCompanyInput
  ) {
    return this.companiesService.create(createCompanyInput);
  }

  @Mutation(() => Company)
  updateCompany(
    @Args("updateCompanyInput") updateCompanyInput: UpdateCompanyInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.companiesService.update(id, updateCompanyInput);
  }
}
