---
layout: post
title: "Flutter Theme Demo"
date: "2019-09-06 14:14:14 +0700"
---

<p align="center">
<img src="/assets/thoughts/flutter-mobile/flutter-theme-demo/flutter_theme_demo.gif" width="328px" alt="flutter theme demo">
</p>

You can share the colors, font styles for screens in your app by using themes. You can define multiple **theme** datas and set it to the theme widgets. You just created at the roof of an apps by the **MaterialApp**.

Below is step-by-step tutorial to setup the theme for flutter apps, also we'll see how to manually switch theme on specific events. I'll assume you know [how to setup a flutter app](/2019/08/25/first-app-and-basic-structure-in-flutter/) so we’ll skip that part.

To manually switch theme in Flutter we needs a package to support push events to another widgets. We're going to use the [provider](https://pub.dev/packages/provider) package.

So first step is to include the packages in *pubspec.yaml* file. For that just add the package name under the dependencies. It would look something like this.

```yaml
dependencies:
  provider: ^3.1.0
```

We'll import it in the main.dart file first. Goto your main.dart file and add import the package.

```dart
import 'package:provider/provider.dart';

void main() => runApp(
  ChangeNotifierProvider<GlobalModel>(
      builder: (context) => GlobalModel(),
      child: MyApp(),
    ),
  );
//...
```

The next step is define the **theme data**.
```dart
class GlobalModel {

  var themeData = ThemeData(
    primaryColor: Colors.redAccent,
    appBarTheme: AppBarTheme(
      iconTheme: IconThemeData(
        color: Colors.white,
        size: 40
      ),
      textTheme: TextTheme(
        title: TextStyle(
          color: Colors.white,
          fontSize: 20,
        )
      )
    ),
  );

  //...
}
```
Next step is setup theme data into your app.

```dart
final model = Provider.of<GlobalModel>(context);
return MaterialApp(
  title: 'Flutter Theme Demo',
  theme: model.themeData
  //...
);
```

Final step is change theme data.
```dart
final model = Provider.of<GlobalModel>(context);
model.themeData = ThemeData(
  brightness: Brightness.dark,
  appBarTheme: AppBarTheme(
    iconTheme: IconThemeData(
      color: Colors.grey,
      size: 40
    ),
    textTheme: TextTheme(
      title: TextStyle(
        color: Colors.grey,
        fontSize: 20,
      )
    )
  ),
);
model.notifyListeners();
```
That's all for this article, you can checkout the source code of the example [at here](https://github.com/devexps/flutter/tree/master/mobile/flutter_theme).

Okay, I'll see you next article and enjoy!
