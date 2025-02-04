// create-user.dto.ts
import { Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs'
import { Attribute } from '../entities/attribute';
import { calcMod } from 'src/utils/mod-calc';
import { Weapon } from '../entities/weapon';

class KnightMapper {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  nickname: string;

  @Expose()
  birthday: Date;

  @Expose()
  keyAttribute: string;

  @Expose()
  isHero: boolean;

  @Expose()
  attributes: Attribute;

  @Expose()
  weapons: Weapon[];

  @Expose()
  @Transform(({ obj }) => obj.weapons?.length || 0)
  weaponsCount: number;

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.birthday) {
      return 0;
    }

    const birthday = dayjs(obj.birthday);
    const today = dayjs();

    let age = today.diff(birthday, 'year');

    if (today.month() < birthday.month() || (today.month() === birthday.month() && today.date() < birthday.date())) {
      age--;
    }

    return age;
  })
  age: number;


  @Expose()
  @Transform(({ obj }) => {
    if (!obj.keyAttribute) {
      return 0
    }
    return 10 + calcMod(obj?.attributes[obj?.keyAttribute]) + (obj.weapons?.find(x => x.equipped == true)?.mod || 0)
  })
  attack: number;

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.birthday) {
      return 0;
    }

    const birthday = dayjs(obj.birthday);
    const today = dayjs();

    let age = today.diff(birthday, 'year');

    if (today.month() < birthday.month() || (today.month() === birthday.month() && today.date() < birthday.date())) {
      age--;
    }

    if (age < 7) {
      return 0;
    }

    return Math.floor((age - 7) * Math.pow(22, 1.45));
  })
  exp: number;
}

export { KnightMapper }
