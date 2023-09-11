import { prismaClient } from "$lib/db.server";

const res =await prismaClient.contact.findMany