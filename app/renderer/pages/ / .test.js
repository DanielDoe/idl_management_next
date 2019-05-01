import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import {   } from './ ';

configure({ adapter: new Adapter() });

describe(' ', () => {

    describe('view model', () => {
        let  ;
        beforeEach(() => {
              = new  ();
        });
        
        describe('propertyOrFunction', () => {
            it('does something (SAMPLE)', () => {
                expect(false).toBe(true);
            });
        });

    });

    describe('bindings', () => {
        const rendered = shallow(<  />);

        it('binds div (SAMPLE)', () => {
            const elements = rendered.find('div[data-bind=""]');
            expect(elements.length).toBe(1);
        });
    })

});