import React from 'react';

import Container from './container';
import Card from './card';
import Card_description from './card_description';
import Card_text from './card_text';
import Card_pro from './card_pro';
import A from 'components/genericComponents/A/cook';
import Description from './description';
import BirthDay from './birthDay';
import Space from './space';
import CookCarousel from 'components/specificComponents/CookCarousel';
import WorkshopsList from 'components/specificComponents/WorkshopsList';
import CookMaps from '../CookMaps';
import Commentary from 'components/specificComponents/Commentary';

// Import React Icons
import Certif from 'react-icons/lib/fa/certificate';
import Cutlery from 'react-icons/lib/fa/cutlery';
import Envelope from 'react-icons/lib/fa/envelope';
import Briefcase from 'react-icons/lib/fa/briefcase';
import Location from 'react-icons/lib/fa/location-arrow';
import Cake from 'react-icons/lib/fa/birthday-cake';

export default class CookItemWithData extends React.Component {
  pro(cook) {
    if (cook.is_pro) {
      return (
        <span>
          <Certif /> Cuisinier Professionnel
          <br />
          <Briefcase /> Siren : {cook.siren}
        </span>
      );
    } else {
      return (
        <span>
          <Cutlery /> Cuisinier Particulier
        </span>
      );
    }
  }

  render() {
    const cook = this.props.cook;
    const pro = cook.is_pro ? 'Cuisinier Pro' : 'Cuisinier Particulier';
    const first_name = cook.first_name_legal
      ? cook.first_name_legal
      : 'Nom indisponible';
    const last_name = cook.last_name_legal
      ? cook.last_name_legal
      : 'Prenom indisponible';
    const pro_name = cook.business_name
      ? cook.business_name
      : 'Nom pro indisponible';
    const email = cook.email_pro ? cook.email_pro : 'Email pro indisponible';
    const birthday = cook.birthday_legal
      ? cook.birthday_legal
      : 'Anniversaire indisponible';
    return (
      <div>
        <CookCarousel />
        <Container direction="row" wrap="wrap">
          <Card>
            <Card_description>
              <Card_text>
                {first_name} {last_name} {pro_name}
              </Card_text>
              <Card_pro>
                {this.pro(cook)}
                <br />
                <span>
                  <Envelope /> {email}
                </span>
                <br />
                <span>
                  <Location /> <A href="#maps">Location</A>
                </span>
              </Card_pro>
            </Card_description>
            <Description>
              <hr />
              {cook.description}
            </Description>
            <BirthDay>
              <Cake /> {birthday}
            </BirthDay>
          </Card>
        </Container>
        <Container direction="row" wrap="wrap">
          <WorkshopsList workshops={cook.workshop} />
        </Container>
        <div id="maps" />
        <CookMaps
          lat={cook.gourmet.location.x}
          lon={cook.gourmet.location.y}
          radius={3000}
        />
        <Space />
        <Container direction="row" wrap="wrap">
          <Commentary id={cook.cook_id} />
        </Container>
        <Space />
      </div>
    );
  }
}
