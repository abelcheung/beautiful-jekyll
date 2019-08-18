---
title: Markdown Table Examples
date: 2019-08-18T09:28:00+08:00
excerpt: Table examples demonstrating bootstrap classes
tags:
  - table
  - css
  - bootstrap
  - demo
---

In the following examples, markdown tables are shown in combination with
[bootstrap classes](https://getbootstrap.com/docs/3.4/css/#tables). For very
basic bootstrap support, use `table` class. 

Although possible to use the clumsy HTML table, the most convenient way to
add classes and attributes to markdown table is through
[Inline Attribute List][kramdown ial].

Table data comes from [Wikipedia highest temperature record][wiki temp].

[kramdown ial]: https://kramdown.gettalong.org/syntax.html#inline-attribute-lists
[wiki temp]: https://en.wikipedia.org/wiki/Highest_temperature_recorded_on_Earth

## Default table

**Warning:** Table is not responsive by default. Data would be cramped or partially
hidden under mobile browsers (width &lt; 768px).
{: .callout .callout-warning}

```md
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
...
{: .table}
```

| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table}

## Responsive table

The fix is to add a `div` wrapper with `table-responsive` class, so that
tables are horizontally scrollable under smaller widths. To recognize
markdown inside `div`'s, also add `markdown="1"`. All tables from here
on would be horizontally scrollable.

```md
<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
...
{: .table}
</div>
```

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table}
</div>

## Zebra striped

Using `{: .table .table-striped}`:

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table .table-striped}
</div>

## Bordered

Use `{: .table .table-bordered}` for bordered table cells:

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table .table-bordered}
</div>

## Hover rows

Use `{: .table .table-hover}` for enabling hover state on
mouseover.

**Note:** Hover state affects table body (`<tbody>`) only, header is unaffected.
{: .callout .callout-info}

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table .table-hover}
</div>

## Condensed layout

Use `{: .table .table-condensed}` for smaller cell padding.

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table .table-condensed}
</div>

## Combined classes

Above classes can be combined. Following table uses zebra strip
and hover row together:

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table .table-striped .table-hover}
</div>

## Bootstrap contextual color

### Whole table

The only case where markdown table can still be used is applying
background color on whole table. Using
[bootstrap contextual background][bs bg] classes such as `bg-info`,
as in `{: .table .bg-info}`:

[bs bg]: https://getbootstrap.com/docs/3.4/css/#helper-classes-backgrounds

<div class="table-responsive" markdown="1">
| Date | Temperature °C | Type | Cause | Location |
|-----:|---------------:|:----:|:-----:|----------|
| July 15, 1972 | 93.9 | Ground | N/A | Furnace Creek Ranch |
| June 1967 | 86.7 | Unknown | Heat burst | Abadan |
| 2011 | 84.0 | Ground | N/A | Port Sudan |
| 2005 | 70.7 | Satellite | N/A | Lut Desert |
| July 6, 1949 | 70.0 | Air | Heat burst | Figueira da Foz |
{: .table .bg-info}
</div>

### All other cases

**Beware:** HTML table is required. Markdown table doesn't
accept per row/column/cell attributes.
{: .callout .callout-danger}

Bootstrap provides 5 contextual color classes usable in table: `active`,
`success`, `info`, `warning`, `danger`. Besides these, `bg-primary` can
also be used, styling a cell like primary button. These are applicable
on table row and cell background.

For other cases (primarily column style `<col>`), use
[contextual background][bs bg] instead.

[Contextual text color][bs col] can be applied on table cell text, like
`text-warning`, `text-info` etc.

[bs col]: https://getbootstrap.com/docs/3.4/css/#helper-classes-colors

<div class="table-responsive">
<table class="table table-condensed table-hover">
	<caption class="text-center">Highest temperature record</caption>
	<colgroup>
		<col>
		<col class="bg-danger">
		<col>
		<col>
		<col>
	</colgroup>
	<thead>
		<tr>
			<th class="text-right bg-primary" scope="col">Date</th>
			<th class="text-right" scope="col">Temperature °C</th>
			<th class="text-center" scope="col">Type</th>
			<th class="text-center" scope="col">Cause</th>
			<th>Location</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="text-right">July 15, 1972</td>
			<td class="text-right text-danger">93.9</td>
			<td class="text-center">Ground</td>
			<td class="text-center">N/A</td>
			<td>Furnace Creek Ranch</td>
		</tr>
		<tr class="warning">
			<td class="text-right">June 1967</td>
			<td class="text-right">86.7</td>
			<td class="text-center text-warning">Unknown</td>
			<td class="text-center">Heat burst</td>
			<td>Abadan</td>
		</tr>
		<tr>
			<td class="text-right">2011</td>
			<td class="text-right">84.0</td>
			<td class="text-center">Ground</td>
			<td class="text-center active">N/A</td>
			<td>Port Sudan</td>
		</tr>
		<tr>
			<td class="text-right">2005</td>
			<td class="text-right">70.7</td>
			<td class="text-center success text-success">Satellite</td>
			<td class="text-center">N/A</td>
			<td>Lut Desert</td>
		</tr>
		<tr>
			<td class="text-right">July 6, 1949</td>
			<td class="text-right">70.0</td>
			<td class="text-center">Air</td>
			<td class="text-center">Heat burst</td>
			<td>Figueira da Foz</td>
		</tr>
	</tbody>
</table>
</div>

## Text align shorthand

Although specifying cell text alignment in markdown table is easy, it becomes
rather tedious when entering HTML table. As a shorthand, it is possible to use
`text-left`, `text-right` and `text-center` on table directly, so that all cells
(`<td>` and `<th>`) use a single alignment (caption is always centered). Alignment
for each cell can still be overriden with inline styles.

```html
<table class="table text-right">
	...
	<td style="text-align: center">
	...
</table>
```

<table class="table text-right">
<caption>Dummy caption</caption>
<thead>
	<tr>
		<th>Style 1</th>
		<th>Style 2</th>
		<th>Style 3</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>1.</td>
		<td>i.</td>
		<td>A.</td>
	</tr>
	<tr>
		<td>2.</td>
		<td>ii.</td>
		<td style="text-align: center">B.</td>
	</tr>
	<tr>
		<td>3.</td>
		<td>iii.</td>
		<td>C.</td>
	</tr>
</tbody>
</table>

