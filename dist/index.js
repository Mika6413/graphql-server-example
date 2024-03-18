var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver, buildSchema, } from "type-graphql";
let Book = class Book {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
Book = __decorate([
    ObjectType()
], Book);
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
        id: "1",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
        id: "2",
    },
];
let BookInput = class BookInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], BookInput.prototype, "title", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], BookInput.prototype, "author", void 0);
BookInput = __decorate([
    InputType()
], BookInput);
let BookResolver = class BookResolver {
    books() {
        return books;
    }
    getBookById(id) {
        return books.find((book) => book.id == id);
    }
    addBook({ title, author }) {
        const lastId = parseInt(books.at(-1).id, 10);
        const id = (lastId + 1).toString();
        books.push({ title, author, id });
        return books.at(-1);
    }
};
__decorate([
    Query(() => [Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "books", null);
__decorate([
    Query(() => Book),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "getBookById", null);
__decorate([
    Mutation(() => Book),
    __param(0, Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookInput]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "addBook", null);
BookResolver = __decorate([
    Resolver(Book)
], BookResolver);
const Schema = await buildSchema({
    resolvers: [BookResolver],
});
const server = new ApolloServer({ schema: Schema });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
