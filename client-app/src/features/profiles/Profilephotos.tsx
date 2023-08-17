import { observer } from "mobx-react-lite";
import { Interface } from "readline";
import { Card, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { promises } from "dns";


interface Props {
    profile: Profile;
}
export default observer(function profileProfile({ profile }: Props) {

    return (

        <Tab.Pane>
            <Header icon='image' content='photos' />
            <Card.Group itemsPerRow={5}>
                {profile.phothos?.map(photo => (
                    <Card key={photo.id} >
                        <Image src={photo.url} />
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    )
})