import { Attribute } from "../entities/attribute"
import { Weapon } from "../entities/weapon"

interface ICreateKnightDTO {
  name: string,
  nickname: string,
  birthday: Date,
  keyAttribute: string,
  weapons: string[],
  attributes: Attribute
}

export { ICreateKnightDTO }