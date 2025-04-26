import {
  FastifyInstance,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RawServerDefault,
  FastifyBaseLogger,
} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export interface Item {
  id: string;
  title: string;
  checked: boolean;
}
