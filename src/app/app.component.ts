import { Component, computed, effect, signal, untracked } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { UserComponent } from "./user.component";
import { IUser } from "./IUser";
import { BehaviorSubject } from "rxjs";
import { CommonModule, NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, UserComponent, CommonModule, NgIf],
  templateUrl: "app.component.html",
})
export class AppComponent {
  
  constructor() {
    effect(() => {
      console.log('EFFECT IS RUNNING');
      console.log('Firstname has changed to:', this._firstNameSig());
      console.log("User has changed to: ", this.userSig());
      // console.log('User has changed to: ', untracked(this.userSig));
    })
  }

  title = "signals-demo";
  
  // #1 constructed user object from variables
  private _firstName = "Mike";
  private _lastName = "Albrecht";
  protected computedUser: IUser = { firstName: this._firstName, lastName: this._lastName };
  
  
  // #2 complete user object as variable
  protected user: IUser = { firstName: "Mike", lastName: "Albrecht" };


  // #3 rxjs stream
  private _userSubject = new BehaviorSubject<IUser>({
    firstName: "Mike",
    lastName: "Albrecht",
  });
  protected user$ = this._userSubject.asObservable();

  
  // #4 signal
  protected userSig = signal<IUser>({
    firstName: "Mike",
    lastName: "Albrecht",
  });

  
  // #5 computed signal
  private _firstNameSig = signal("Mike");
  private _lastNameSig = signal("Albrecht");
  protected computedUserSig = computed<IUser>(() => ({
    firstName: this._firstNameSig(),
    lastName: this._lastNameSig(),
  }));

  
  protected onChangeFirstname(): void {
    
    this._firstName = 'Michael';  // #1
    
    this.user.firstName = "Michael";  // #2
    
    this._userSubject.next({
      ...this._userSubject.value,
      firstName: "Michael",
    });

    this.userSig.update((x) => ({ ...x, firstName: "Michael" })); // #4

    this._firstNameSig.set("Michael"); // #5

    /* console.table({
      'computed User': this.computedUser,
      'user': this.user
    }); */
  }

}
