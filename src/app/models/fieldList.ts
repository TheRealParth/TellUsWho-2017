import {Field} from "./field";
import {Ft} from "./fieldTypes.enum";

export const BGI_FIELDS: Field[] = [
  new Field(Ft.Bgi.Dob, Ft.getName(Ft.Bgi.Dob)),
  new Field(Ft.Bgi.Gender, Ft.getName(Ft.Bgi.Gender)),
  new Field(Ft.Bgi.Nationality, Ft.getName(Ft.Bgi.Nationality)),
  new Field(Ft.Bgi.NativeLanguage, Ft.getName(Ft.Bgi.NativeLanguage)),
  new Field(Ft.Bgi.OtherLanguages, Ft.getName(Ft.Bgi.OtherLanguages), true),
  new Field(Ft.Bgi.SexualIdentification, Ft.getName(Ft.Bgi.SexualIdentification)),
  new Field(Ft.Bgi.RelationshipStatus, Ft.getName(Ft.Bgi.RelationshipStatus)),
  new Field(Ft.Bgi.CurrentCountry, Ft.getName(Ft.Bgi.CurrentCountry)),
  new Field(Ft.Bgi.CurrentCity, Ft.getName(Ft.Bgi.CurrentCity)),
  new Field(Ft.Bgi.CurrentState, Ft.getName(Ft.Bgi.CurrentState)),
  new Field(Ft.Bgi.GrownCountry, Ft.getName(Ft.Bgi.GrownCountry)),
  new Field(Ft.Bgi.GrownCity, Ft.getName(Ft.Bgi.GrownCity)),
  new Field(Ft.Bgi.GrownState, Ft.getName(Ft.Bgi.GrownState)),
]
