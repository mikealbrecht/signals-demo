import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { IUser } from "./IUser";

@Component({
  selector: "user-component",
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex flex-row align-items-center gap-4">
      <span class="fw-bold" [style.width]="'250px'">{{ title }}</span>
      <span>User is: {{ user.firstName }} {{ user.lastName }}</span
      >
    </div>
  `,
})
export class UserComponent implements OnChanges {
  @Input({ required: true }) title: string = "default";

  @Input({ required: true }) user: IUser = {
    firstName: "Max",
    lastName: "Mustermann",
  };

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["user"] && !changes["user"].isFirstChange()) {
      console.log(`${this.title}: new input value for user`);
    }
  }
}
