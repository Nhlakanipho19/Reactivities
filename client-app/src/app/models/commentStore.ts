import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ChatComment } from "./comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../stores/store";

export default class CommentStore {
    comment: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    createHubConnection = (activityId: string) => {

        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http/localhost:5000/chat?activityId=' + activityId, {
            .AccessTokenFactory: ()=> store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log("Could not Connect!"));
        this.hubConnection?.on("LoadComments", (comments: ChatComment[]) => {
            runInAction(() => this.comment = comments);
        })
        this.hubConnection?.on('RecievedComment', (comment: ChatComment) => {
            runInAction(() => this.comment.push(comment));
        })


    }
}
stopHubConnection = () => {
    this.hubConnection?.stop().catch((error: any) => console.log('Error Stopping the Connection', error))
}
}


