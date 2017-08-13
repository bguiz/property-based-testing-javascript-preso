// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Deck,
  Fill,
  Fit,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";

import CodeSlide from 'spectacle-code-slide';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  // foo: require("../assets/foo.jpg"),
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={2} fit caps lineHeight={1} textColor="secondary">
            Property-based Testing
          </Heading>
          <Heading size={1} lineHeight={1} textColor="secondary">
            in Javascript
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            <a href="http://bguiz.com" target="_blank">Brendan Graetz</a>
          </Text>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            What is it even?
          </Heading>
          <List>
            <ListItem>
              <Text>Example-based testing</Text>
              <List>
                <ListItem>
                  Each unit test sets up one input scenario, runs the code under test, and then checks the output (and any other effects the code is supposed to have).
                  <a href="http://blog.jessitron.com/2013/04/property-based-testing-what-is-it.html">- Jessica Kerr</a>
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <Text>Property-based testing</Text>
              <List>
                <ListItem>
                  Property-based tests make statements about the output of your code based on the input, and these statements are verified for many different possible inputs.
                  <a href="http://blog.jessitron.com/2013/04/property-based-testing-what-is-it.html">- Jessica Kerr</a>
                </ListItem>
                <ListItem>
                  Not to be confused with parametric testing.
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            Example-based testing
          </Heading>
          <List>
            <ListItem>
              Most tests do this
            </ListItem>
            <ListItem>
              Developer/ tester comes up with specific set up and inputs
            </ListItem>
            <ListItem>
              Developer/ tester comes up with assertions of correct output and behaviour
            </ListItem>
            <ListItem>
              Each input + output combo is an example
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            Property-based testing
          </Heading>
          <List>
            <ListItem>
              Not so common (in Javascript).
            </ListItem>
            <ListItem>
              QuickCheck --> Haskell,
              Hypothesis --> Python
            </ListItem>
            <ListItem>
              Lib generates inputs for testcases based on a seeded PRNG
            </ListItem>
            <ListItem>
              Developer/ tester with test "axioms" + input "boundaries"
            </ListItem>
            <ListItem>
              Testing the properties of a behaviour, rather than known examples of a bahaviour
            </ListItem>
          </List>
        </Slide>
        <CodeSlide
          transition={[]}
          lang="js"
          code={require('raw-loader!../assets/math.js.example')}
          ranges={[
            { loc: [0, 18], title: 'math.js' },
            { loc: [9, 13], title: 'simple sum function', note: '(but there is a bug)' },
            { loc: [14, 16], title: 'simple sum function', note: '(here is the fix for the bug)' },
            { loc: [18, 53], title: 'math.ppty.jest.js', note: 'a jest test file' },
            { loc: [31, 34], title: 'commutative test', note: 'define an axiom' },
            { loc: [34, 37], title: 'commutative test', note: 'define the input types and boundaries' },
            { loc: [41, 49], title: 'commutative test', note: 'call property test util' },
            { loc: [55, 80], title: 'math.ppty.jest.js.snap', note: 'snapshot file for math.ppty.jest.js' },
            { loc: [74, 78], title: 'failed seed list', note: 'persist an array of seeds that failed' },
            { loc: [58, 61], title: 'example based test', note: 'records input that caused the failure' },
            { loc: [68, 69], title: 'example based test', note: 'also "shrinks" to representative input' },
          ]}
        />
        <Slide>
          <Heading textColor="secondary">
            So... snapshots?
          </Heading>
          <List>
            <ListItem>
              Built in serialisation of test expectations
            </ListItem>
            <ListItem>
              But: BYO deserialisation
            </ListItem>
            <ListItem>
              Extremely easy to update snapshots (-u)
            </ListItem>
            <ListItem>
              Creative use... or abuse?
            </ListItem>
          </List>
        </Slide>
        <CodeSlide
          transition={[]}
          lang="js"
          code={require('raw-loader!../assets/property-test-util-testcheck.js.example')}
          ranges={[
            { loc: [0, 232], title: 'property-test-util' },
            { loc: [115, 116], title: 'new seed', note: 'run property based tests with a new seed' },
            { loc: [123, 128], title: 'new seed', note: 'detect duplicate "shrunk"' },
            { loc: [142, 145], title: 'prior seed', note: 'run example based test using seed from prior property-based test' },
            { loc: [149, 151], title: 'prior seed', note: '"creative" use of snapshots' },
            { loc: [177, 183], title: 'failed seed list', note: 'also persist just the failed seeds' },
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={2} fit caps lineHeight={1} textColor="secondary">
            Demo
          </Heading>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            How it works
          </Heading>
          <List>
            <ListItem>
              Property test util helper functions
            </ListItem>
            <ListItem>
              HOF that creates describe"+ "it" blocks for Jest
            </ListItem>
            <ListItem>
              If new property-based test failure occurs, add a new example via snapshots
            </ListItem>
            <ListItem>
              Deserialises snapshots to read prior failed seeds
            </ListItem>
            <ListItem>
              Test expectations generated from these snapshots
            </ListItem>
            <ListItem>
              Can disable shrunk duplication
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            References
          </Heading>
          <List>
            <ListItem>
              <Text>
                <a href="http://leebyron.com/testcheck-js/api#check" target="_blank">
                  TestCheck.js
                </a>
              </Text>
              <Text>
                 Inspired by Haskell QuickCheck
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <a href="http://www.lihaoyi.com/post/PrinciplesofAutomatedTesting.html#example-vs-bulk-tests" target="_blank">
                  Example vs Bulk tests
                </a> by Li Haoyi
              </Text>
              <Text>
                Property-based testing that pulls Scala files off Github at random, parses them, and compares them top the ofiicial Scala compiler
              </Text>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            Where to next?
          </Heading>
          <List>
          <ListItem>
            How can parametric example-based tests be converted to property=based tests
          </ListItem>
            <ListItem>
              Other test runners which support snapshots: e.g. ava
            </ListItem>
            <ListItem>
              Other test runners: e.g. mocha - perhaps use a JSON file?
            </ListItem>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={2} fit caps lineHeight={1} textColor="secondary">
            Fin
          </Heading>
          <Heading size={1} lineHeight={1} textColor="secondary">
            Questions?
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            <a href="http://bguiz.com" target="_blank">Brendan Graetz</a>
          </Text>
        </Slide>
      </Deck>
    );
  }
}
