import React from 'react';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BudgetBuilder} from "./BudgetBuilder";
import BuildControls from '../../components/Budget/BuildControls/BuildControls';
import NavigationItem from "../../components/Navigation/NavigationItems/NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('<BudgetBuilder />',()=>{
    let wrapper;
    beforeEach( ()=>{
        wrapper = shallow(<BudgetBuilder onInitBudgetParts={()=>{}}/>);
    })
    it('should  render <BuildControls /> when receiving bugetParts ', ()=>{
        wrapper.setProps({bparts: {salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});